import { NextResponse } from "next/server";

// Define the shape of our sales data
export interface SalesDataPoint {
  month: string;
  sales: number;
  year: number;
}

// Generate some realistic-looking mock data based on Kaggle retail datasets
const generateMockData = (): SalesDataPoint[] => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const years = [2022, 2023, 2024];
  const data: SalesDataPoint[] = [];

  years.forEach(year => {
    // Adding some base trend and seasonality
    const baseSales = year === 2022 ? 15000 : year === 2023 ? 18000 : 22000;
    
    months.forEach((month, index) => {
      // Create seasonality: higher sales in Q4 (Oct, Nov, Dec) and summer (Jul, Aug)
      let seasonalityMultiplier = 1.0;
      if (index >= 9) seasonalityMultiplier = 1.4; // Q4 bump
      else if (index === 6 || index === 7) seasonalityMultiplier = 1.2; // Summer bump
      else if (index === 1) seasonalityMultiplier = 0.8; // Feb dip
      
      // Add some random noise (-10% to +10%)
      const noise = 1 + (Math.random() * 0.2 - 0.1);
      
      const sales = Math.round(baseSales * seasonalityMultiplier * noise);
      
      data.push({
        month,
        sales,
        year
      });
    });
  });

  return data;
};

export async function GET() {
  try {
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const data = generateMockData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}
