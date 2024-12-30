import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

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

export async function generateLast12MonthData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
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
    const count = await model.countDocuments({
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
}
