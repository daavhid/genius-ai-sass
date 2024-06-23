import React from 'react';

// Function to parse and convert markdown-like text to JSX
const parseTextToJSX = (text: string): JSX.Element => {
    // Split the text into lines
    const lines = text.split('\n');

    // Initialize an array to hold JSX elements
    const elements: JSX.Element[] = [];

    // Temporary arrays to hold list items
    let currentList: JSX.Element[] = [];
    let isOrderedList = false;
    
    // Function to close a list
    const closeList = () => {
        if (currentList.length > 0) {
            if (isOrderedList) {
                elements.push(<ol>{currentList}</ol>);
            } else {
                elements.push(<ul>{currentList}</ul>);
            }
            currentList = [];
        }
    };

    // Iterate over each line
    lines.forEach((line, index) => {
        // Convert bold text (**bold**)
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Convert italic text (*italic*)
        line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');

        if (line.match(/^\d+\.\s/)) {
            // Ordered list item
            closeList();
            isOrderedList = true;
            currentList.push(<li key={index} dangerouslySetInnerHTML={{ __html: line }} />);
        } else if (line.startsWith('* ')) {
            // Unordered list item
            closeList();
            isOrderedList = false;
            currentList.push(<li key={index} dangerouslySetInnerHTML={{ __html: line.slice(2) }} />);
        } else {
            // Regular paragraph
            closeList();
            elements.push(<p key={index} dangerouslySetInnerHTML={{ __html: line }} />);
        }
    });

    // Close any remaining list
    closeList();

    return <div>{elements}</div>;
};


export default parseTextToJSX