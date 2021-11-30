import React from 'react';


class Canvas extends React.Component {

    state = {
        coord: []
    }

    newCanvas() {

        let newcoord = [];
        const ctx = this.canvas.getContext('2d');
        this.setState({ coord: newcoord }, function () {
            this.props.draw(this.canvas, ctx, this.state.coord);
            //console.log(this.state.coord);
        });
    }
    prims() {

        let visited = [];
        let unvisited = [];
        let unvisited1 = [];
        for (let i in this.state.coord) {
            unvisited.push(this.state.coord[i]);
            unvisited1.push(this.state.coord[i]);
        }
        let length = unvisited.length;
        let first = unvisited[0];

        visited.push(first);
        unvisited.splice(0, 1);

        while (length > 1) {


            let minEdge = Infinity;
            let parent = null;
            let currentVertex = null;
            for (let i in visited) {

                for (let j in unvisited) {
                    let weight = this.calWeight(visited[i][0], visited[i][1], unvisited[j][0], unvisited[j][1]);
                    if (minEdge > weight) {
                        minEdge = weight;
                        currentVertex = j;
                        parent = i;
                    }
                }

            }
            console.log(visited, unvisited);
            this.props.drawPrims(parent, currentVertex, visited, unvisited, this.canvas, this.canvas.getContext('2d'));
            visited.push(unvisited[currentVertex]);
            unvisited.splice(currentVertex, 1);
            length = length - 1;
        }
    }
    calWeight(x1, y1, x2, y2) {
        let x = Math.pow(x1 - x2, 2);
        let y = Math.pow(y1 - y2, 2);
        return Math.sqrt(x + y);
    }


    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        this.props.outline(this.canvas, ctx);
    }

    render() {
        let width = window.innerWidth - 45;
        let height = window.innerHeight * 0.6;
        
        return (
            <div id="head">

                <div className=" pt-2 pb-2 bg-warning text-dark container-float">

                    <div className="navbar-brand ml-4 ">
                        Minimum Spanning Tree
                    </div>

                    

                    <button className="btn btn-outline-dark float-right mr-4 pt-2" onClick={() => { this.newCanvas() }}>
                        Clear Canvas
                    </button>

                    <div className="mt-2 d-flex justify-content-center">
                        You can start drawing the MST by clicking on canvas.
                        </div>
                        <div className="mt-2 d-flex justify-content-center">
                        Click to Add | Right-Click to Remove.
                        </div>
                        <div className="mt-2 d-flex justify-content-center">
                        Generated by Prim's Algorithm using Euclidean Distances as weights of graph
                    </div>

                </div>
                <canvas
                    className="mr-4 ml-4 mt-2 bg-light"
                    onClick={(e) => {
                        const ctx = this.canvas.getContext('2d');
                        let coord = [];
                        let xypair = [];
                        coord.push(e.clientX);
                        coord.push(e.clientY);

                        xypair.push(coord);

                        if (this.state.coord.length === 0) {
                            this.setState({ coord: xypair }, function () {
                                //->prims (prims will draw edges)
                                this.props.draw(this.canvas, ctx, this.state.coord);
                            });
                        }
                        else {
                            let newCoord = this.state.coord;
                            newCoord.push(xypair[0]);
                            this.setState({ coord: newCoord }, function () {
                                this.props.draw(this.canvas, ctx, this.state.coord);
                                this.prims();
                                //console.log(this.state.coord);
                            });

                        }

                    }}
                    onContextMenu={(e) => {

                        e.preventDefault();
                        const ctx = this.canvas.getContext('2d');
                        let coordX = e.clientX;
                        let coordY = e.clientY;
                        let coord = this.state.coord;

                        for (let i in this.state.coord) {
                            let isInside = Math.sqrt(Math.pow(coord[i][0] - coordX, 2) + Math.pow(coord[i][1] - coordY, 2)) < 8;
                            if (isInside) {
                                coord.splice(i, 1);
                                break;
                            }
                        }
                        this.setState({ coord: coord }, function () {
                            this.props.draw(this.canvas, ctx, this.state.coord);
                            this.prims();
                        });

                    }}

                    ref={node => (this.canvas = node)}
                    width={width}
                    height={height}
                />
            </div>
        );
    }
}

export default Canvas;



/*TO DO
oncontextmenu  =  delete node



visited node/->


*/