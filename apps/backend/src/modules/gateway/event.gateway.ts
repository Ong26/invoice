import { PrismaService } from '@/database/prisma/prisma.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface InvoiceEditStatus {
  [invoiceId: string]: string; // Maps invoiceId to userId
}

@WebSocketGateway(3001, { namespace: 'edit-invoice' })
export class EventGateway {
  constructor(private prisma: PrismaService) {}
  @WebSocketServer()
  server: Server;

  private invoiceEditStatus: InvoiceEditStatus = {};

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      socket.emit('editStatusUpdate', this.invoiceEditStatus);
    });
  }

  @SubscribeMessage('startEditing')
  async startEditing(
    @MessageBody() data: { invoiceId: string; userId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(this.invoiceEditStatus);
    if (this.invoiceEditStatus[data.invoiceId]) {
      const userEditing = await this.prisma.user.findUnique({
        where: { id: this.invoiceEditStatus[data.invoiceId] },
      });
      if (data.userId !== data.userId) {
        socket.emit('editDenied', {
          invoiceId: data.invoiceId,
          message: `Invoice is being edited by ${userEditing.firstName}`,
        });
        return;
      }
    }
    this.invoiceEditStatus[data.invoiceId] = data.userId;

    socket.broadcast.emit('editStatusUpdate', this.invoiceEditStatus);
  }

  @SubscribeMessage('endEditing')
  endEditing(@MessageBody() data: { invoiceId: string; userId: string }) {
    if (this.invoiceEditStatus[data.invoiceId] !== data.userId) {
      return;
    }
    delete this.invoiceEditStatus[data.invoiceId];
    this.server.emit('editStatusUpdate', this.invoiceEditStatus);
  }
}
