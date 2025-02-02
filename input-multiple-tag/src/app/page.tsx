import MultiSelectInput from "./components/MultiSelectInput";

export default function Home() {
  const options = ["Bar Chart", "Line Chart", "Pie Chart", "Radar Chart", "Doughnut Chart",
  "Polar Area Chart", "Bubble Chart", "Scatter Chart", "Heatmap Chart", "Treemap Chart",
  "Candlestick Chart", "Box Plot Chart", "Waterfall Chart", "Funnel Chart", "Sunburst Chart",
  "Gauge Chart", "Sankey Diagram", "Chord Diagram", "Word Cloud", "Parallel Coordinates"];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <MultiSelectInput options={options} />
    </div>
  );
}