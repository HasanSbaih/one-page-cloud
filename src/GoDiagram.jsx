import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';

const GoJSDiagram = ({ data }) => {
    const goJsDiv = useRef(null);

    useEffect(() => {
        const $ = go.GraphObject.make;

        // Initialize the diagram
        const diagram = $(go.Diagram, goJsDiv.current, {
            'undoManager.isEnabled': true,
        });

        diagram.layout = $(go.LayeredDigraphLayout, {
            direction: 0,  // 0 is for left-to-right; 90 for top-to-bottom
            layerSpacing: 70,  // Vertical gap between nodes
            columnSpacing: 100  // Horizontal gap between nodes
        });
        

        diagram.nodeTemplate =
            $(go.Node, 'Auto',
                $(go.Shape, { figure: 'RoundedRectangle', fill: 'white' },
                    new go.Binding('fill', 'color')),
                $(go.TextBlock, { margin: 8 },
                    new go.Binding('text', 'resource'))
            );

        diagram.linkTemplate =
            $(go.Link,
                $(go.Shape),
                $(go.TextBlock, { segmentOffset: new go.Point(0, -10) },
                    new go.Binding('text', 'text')),
                $(go.Shape, { toArrow: 'Standard' })
            );

        // Convert the data from your JSON structure to GoJS's format
        const nodeDataArray = data.resources.map(resource => ({
            key: resource.index,
            resource: resource.resource,
        }));

        const linkDataArray = data.Links.map(link => ({
            from: link.source,
            to: link.destination,
            text: link.operation,
        }));

        diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

        // Cleanup: if the component gets destroyed, we should dissociate the diagram to prevent errors
        return () => {
            diagram.div = null;
        };
    }, [data]);  // The dependency array ensures this effect runs only once when data changes

    return <div ref={goJsDiv} style={{ width: '100%', padding:'100px' }} />;
};

export default GoJSDiagram;
