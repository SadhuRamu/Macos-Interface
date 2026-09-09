# Next.js 15 Sales Dashboard

**Project Overview**
The Next.js 15 Sales Dashboard is a comprehensive, modern web application built for a technical assessment. It serves as an interactive analytics dashboard allowing users to visualize Kaggle retail sales metrics over multiple years using a rich set of Recharts visualizations. The interface is clean, highly responsive, and built to adhere strictly to professional architectural standards.

## Architecture
The application layout is structured using the **Atomic Design methodology**. This approach breaks the user interface down into fundamental, reusable pieces, scaling up to complex page layouts.

* `src/components/atoms/`: Contains basic UI controls such as `Button`, `Input`, `Select`, `Badge`, and `Card`. These are the smallest indivisible elements.
* `src/components/molecules/`: Simple combinations of atoms. Features like the `FilterInput` and `ChartTypeSelector`.
* `src/components/organisms/`: Complex UI chunks that combine multiple molecules and atoms. Features the `SalesChartCard`, `Sidebar`, and `Navbar`.
* `src/components/templates/`: Page-level layout containers like the `DashboardLayout` that define the overall structural grid.
* `src/app/dashboard/`: The main dashboard page assembling the templates and organisms into the final user-facing route.
* `src/app/api/sales/`: A Next.js server route providing simulated 2022, 2023, and 2024 Kaggle sales data endpoints to feed the charts dynamically.

## Key Features
* **Interactive Chart Components**: High-performance, scalable `Recharts` data visualization.
* **Custom Sales Threshold Filters**: A dynamic input allowing users to filter out months below a specific sales threshold on the fly.
* **Dynamic Chart Toggling**: Seamless switching between Bar, Line, and Pie charts without page reloads.
* **Year Selection**: Dropdown to isolate data for specific years (2022, 2023, 2024) or to show all years aggregated together.
* **API Routing**: A fully simulated backend API returning structured, realistic JSON data with seasonal trends and data noise.
* **Clean Navigation**: Sidebar with inactive links correctly disabled with clean UI "(Coming Soon)" badges to prevent 404s.

## Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS (v4)
* **Visualization**: Recharts
* **Icons**: Lucide-react

## Installation & Setup Instructions

To get this project running locally on your machine, follow these simple steps:

1. **Install dependencies:**
   Make sure you have Node.js installed. Navigate to the project root and run:
   ```bash
   npm install
   ```

2. **Run the development server:**
   Start the local Next.js development server:
   ```bash
   npm run dev
   ```

3. **View the Dashboard:**
   Open your browser and navigate to: [http://localhost:3000/dashboard](http://localhost:3000/dashboard). The root URL will also automatically redirect to this path.

## GitHub Setup

To push this project to a remote GitHub repository for the technical assessment, execute the following commands in your terminal:

```bash
# Initialize the git repository (if not already done)
git init

# Stage all project files
git add .

# Create the initial commit
git commit -m "Initial commit: Complete Next.js 15 Sales Dashboard"

# Link to your newly created GitHub repository
git remote add origin https://github.com/your-username/your-repo-name.git

# Set the main branch and push the code
git branch -M main
git push -u origin main
```
