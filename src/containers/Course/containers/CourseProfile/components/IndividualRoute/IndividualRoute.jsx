import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  "@keyframes show": {
    from: {
      transform: 'scale(0)',
    },
    to: {
      transform: 'scale(1)',
    },
  },
  tooltip: {
    position: 'absolute',
    height: 'fit-content',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#576574',
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    border: '1px solid',
    '& > p': {
      padding: 0,
      margin: 1,
    },
    animation: "$show .1s",
  }
}))

const IndividualRoute = ({ nodes, edges }) => {
  const classes = useStyles();

  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const boxRef = useRef(null);

  useEffect(() => {
    if (!nodes || !edges) {
      return;
    }

    const graph = new G6.Graph({
      container: boxRef.current,
      width: boxRef.current.offsetWidth,
      height: boxRef.current.offsetHeight,
      fitView: true,
      defaultNode: {
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
      },
      defaultEdge: {
        style: {
          endArrow: true,
        }
      },
      layout: {
        type: 'force',
        linkDistance: 105,
        preventOverlap: true,
        nodeSpacing: 10,
      },
    });

    graph.edge(edge => ({
      style: {
        stroke: edge.isPointPath ? 'steelblue' : '#d2d2d2',
        lineWidth: edge.isPointPath ? 4 : 2
      },
    }))

    const tooltip = document.createElement('div');
    tooltip.classList = classes.tooltip;

    graph.on('node:mouseenter', ({ item: { _cfg: { id } }, clientX, clientY }) => {
      const node = nodes.find(item => item.id === id);

      tooltip.innerHTML = `<p><b>Тема</b>: ${node.title}</p><p><b>Сложность</b>: ${node.diff}</p>`;

      tooltip.style.top = clientY + 10 + 'px';
      tooltip.style.left = clientX + 20 + 'px';

      document.body.append(tooltip);
    })

    graph.on('node:mouseout', () => tooltip.remove());

    graph.data({ nodes, edges });
    graph.render();
  }, [nodes, edges])

  return (
    <div ref={boxRef} className={classes.root} />
  );
};

export default IndividualRoute;
