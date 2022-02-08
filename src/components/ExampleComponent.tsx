import React from 'react';

function ExampleComponent() {
    return (
        <div className="font-bold">
            Example Component rendered at: { (new Date()).toString() }
        </div>
    );
}

export default ExampleComponent;
