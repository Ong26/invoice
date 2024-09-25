-- CreateEnum
CREATE TYPE "ValidateTINMethod" AS ENUM ('BRN', 'MYKAD', 'ARMYNO', 'PASSPORT');

-- CreateTable
CREATE TABLE "InvoiceLineItem" (
    "ID" TEXT NOT NULL,
    "InvoiceID" TEXT NOT NULL,
    "Classification" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Quantity" DOUBLE PRECISION NOT NULL,
    "UnitPrice" DOUBLE PRECISION NOT NULL,
    "Subtotal" DOUBLE PRECISION NOT NULL,
    "Measurement" TEXT,
    "TaxRate" DOUBLE PRECISION,
    "TaxType" TEXT,
    "TaxAmount" DOUBLE PRECISION,
    "TaxExemptionDetails" TEXT,
    "Discount" DOUBLE PRECISION,
    "DiscountRate" DOUBLE PRECISION,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InvoiceLineItem_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "ID" TEXT NOT NULL,
    "ShortID" INTEGER NOT NULL,
    "LHDNInvoiceNo" TEXT,
    "InvoiceNo" TEXT NOT NULL,
    "InvoiceDate" TIMESTAMP(3) NOT NULL,
    "DueDate" TIMESTAMP(3),
    "BuyerID" TEXT NOT NULL,
    "SupplierID" TEXT NOT NULL,
    "Currency" TEXT NOT NULL,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "TotalTax" DOUBLE PRECISION NOT NULL,
    "TotalDiscount" DOUBLE PRECISION NOT NULL,
    "TotalAmountPayable" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BuyerAddress" (
    "Line1" TEXT NOT NULL,
    "Line2" TEXT,
    "Line3" TEXT,
    "PostalZone" TEXT,
    "City" TEXT,
    "State" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "BuyerID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BuyerContactNumber" (
    "ID" TEXT NOT NULL,
    "BuyerID" TEXT NOT NULL,

    CONSTRAINT "BuyerContactNumber_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "TIN" TEXT NOT NULL,
    "BRN" TEXT,
    "MyKadNo" TEXT,
    "ArmyNo" TEXT,
    "PassportNo" TEXT,
    "SST" TEXT,
    "Email" TEXT NOT NULL,
    "CreatedByID" TEXT NOT NULL,
    "UpdatedByID" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "SupplierAddress" (
    "ID" TEXT NOT NULL,
    "Line1" TEXT NOT NULL,
    "Line2" TEXT,
    "Line3" TEXT,
    "PostalZone" TEXT,
    "City" TEXT,
    "State" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "SupplierID" TEXT NOT NULL,

    CONSTRAINT "SupplierAddress_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "SupplierContactNumber" (
    "ID" TEXT NOT NULL,
    "SupplierID" TEXT NOT NULL,
    "CountryCode" TEXT NOT NULL,
    "Number" TEXT NOT NULL,

    CONSTRAINT "SupplierContactNumber_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "TIN" TEXT NOT NULL,
    "BRN" TEXT,
    "MyKadNo" TEXT,
    "ArmyNo" TEXT,
    "PassportNo" TEXT,
    "SST" TEXT,
    "Email" TEXT NOT NULL,
    "ValidateTINBy" "ValidateTINMethod",
    "TourismTaxNo" TEXT,
    "MSICCode" TEXT,
    "BusinessActivityDescription" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "SupplierSetting" (
    "ID" TEXT NOT NULL,
    "SupplierID" TEXT NOT NULL,
    "Setting" JSONB NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierSetting_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_LHDNInvoiceNo_key" ON "Invoice"("LHDNInvoiceNo");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerAddress_BuyerID_key" ON "BuyerAddress"("BuyerID");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerContactNumber_BuyerID_key" ON "BuyerContactNumber"("BuyerID");

-- CreateIndex
CREATE INDEX "BuyerContactNumber_BuyerID_idx" ON "BuyerContactNumber"("BuyerID");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierAddress_SupplierID_key" ON "SupplierAddress"("SupplierID");

-- CreateIndex
CREATE INDEX "SupplierAddress_SupplierID_idx" ON "SupplierAddress"("SupplierID");

-- CreateIndex
CREATE INDEX "SupplierAddress_ID_idx" ON "SupplierAddress"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierContactNumber_SupplierID_key" ON "SupplierContactNumber"("SupplierID");

-- CreateIndex
CREATE INDEX "SupplierContactNumber_ID_SupplierID_idx" ON "SupplierContactNumber"("ID", "SupplierID");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierSetting_SupplierID_key" ON "SupplierSetting"("SupplierID");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_InvoiceID_fkey" FOREIGN KEY ("InvoiceID") REFERENCES "Invoice"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_BuyerID_fkey" FOREIGN KEY ("BuyerID") REFERENCES "Buyer"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerAddress" ADD CONSTRAINT "BuyerAddress_BuyerID_fkey" FOREIGN KEY ("BuyerID") REFERENCES "Buyer"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerContactNumber" ADD CONSTRAINT "BuyerContactNumber_BuyerID_fkey" FOREIGN KEY ("BuyerID") REFERENCES "Buyer"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_CreatedByID_fkey" FOREIGN KEY ("CreatedByID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_UpdatedByID_fkey" FOREIGN KEY ("UpdatedByID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierAddress" ADD CONSTRAINT "SupplierAddress_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierContactNumber" ADD CONSTRAINT "SupplierContactNumber_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierSetting" ADD CONSTRAINT "SupplierSetting_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Supplier"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
