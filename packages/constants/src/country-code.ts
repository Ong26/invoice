import CountryCodes, { CountryProperty } from "country-codes-list";

export const CountryCodeWithCallingCode = Object.entries(CountryCodes.customList("countryNameEn" as CountryProperty, "+{countryCallingCode}")).map(
	([key, value]) => ({
		country: ` (${value}) ${key}`,
		callingCode: value,
		countryCallingCode: `${key} (${value})`,
	})
);

export const CountryCodeList = CountryCodeWithCallingCode.map((country) => country.callingCode);
