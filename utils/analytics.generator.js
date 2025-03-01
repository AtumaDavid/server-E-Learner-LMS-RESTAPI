"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthData = generateLast12MonthData;
// export async function generateLast12MonthData<T extends Document>(
//   model: Model<T> // The Mongoose model to query
// ): Promise<{ last12Months: MonthData[] }> {
//   // Initialize an empty array to store monthly data
//   const last12Months: MonthData[] = [];
//   // Get the current date and adjust it to the next day
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   // Loop through the last 12 months (in reverse order)
//   for (let i = 11; i >= 0; i--) {
//     // Calculate the end date for the current month period
//     // Subtracts 28 days to define a month-long period
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() ,
//       currentDate.getDate() - 1 * 28
//     );
//     // Calculate the start date by going back another 28 days
//     const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 28);
//     // Format the month and year for display (e.g., "15 Jan 2023")
//     const monthYear = endDate.toLocaleString("default", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//     // Count documents created within the specific date range
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });
//     // Add the month data to the results array
//     last12Months.push({ month: monthYear, count });
//   }
//   // Return the array of monthly data
//   return { last12Months };
// }
// /*
// ## Purpose of the Code The generateLastMonthData function is designed to:
//  Generate statistical data for the last 12 months for a given MongoDB model
//  Count the number of documents created in each month-long period
//  Return an array of month-wise document counts
//  */
function generateLast12MonthData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const last12Months = [];
        const currentDate = new Date();
        for (let i = 11; i >= 0; i--) {
            // Calculate end date (28 days ago from current date)
            const endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - i * 28);
            // Calculate start date (28 days before end date)
            const startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 28);
            // Format month for display
            const monthYear = endDate.toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            // Count documents within the 28-day period
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            last12Months.push({
                month: monthYear,
                count,
            });
        }
        return { last12Months };
    });
}
