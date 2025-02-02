#MultiSelect Input Component#

This is a multi-select input component with search and match highlighting, developed in React, TypeScript, and TailwindCSS.

Requirements

Before starting, make sure you have installed:

Node.js (recommended version: 16+)

npm or yarn

Installation

Clone the repository and navigate to the project folder:

git clone https://github.com/yourusername/your-repository.git
cd your-repository

Then, install the required dependencies:

npm install  # Or use 'yarn install' if you prefer Yarn

Running the Project

To start the development server, use the following command:

npm run dev  # Or 'yarn dev'

This will start the server at http://localhost:3000/ (or the assigned port).

Usage

The MultiSelectInput component is located in the components/ folder and can be imported and used as follows:

import MultiSelectInput from "./components/MultiSelectInput";

const options = [
  "Bar Chart", "Line Chart", "Pie Chart", "Scatter Plot", "Histogram",
  "Heatmap", "Radar Chart", "Bubble Chart"
];

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MultiSelectInput options={options} />
    </div>
  );
}

Features

Real-time search: Filters options as you type.

Multi-selection: Adds multiple options as tags.

Remove tags: Allows removing selected items.

Add new options: If the entered value does not exist, it can be added.

Keyboard shortcuts:

Enter: Selects an option or adds a new value.

Backspace: Deletes the last tag if the input is empty.

ArrowUp / ArrowDown: Navigates through the options list.

Ctrl + A: Selects/deselects all filtered options.

Clicking outside the input: Closes the dropdown.

Build and Deployment

To build the project for production:

npm run build  # Or 'yarn build'

To start the server in production mode:

npm start  # Or 'yarn start'

Technologies Used

React (Next.js optional framework)

TypeScript

TailwindCSS
