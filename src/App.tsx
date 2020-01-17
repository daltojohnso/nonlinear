import React, {useState} from 'react';
import Plot, {PlotParams} from 'react-plotly.js';
import math from 'mathjs';

const initialCandidate = 'x^2';
const App: React.FC = () => {
    const [candidateEq, setCandidateEq] = useState<string>(initialCandidate);
    const [equation, setEquation] = useState<string>(initialCandidate);

    const plotlyProps = compileEquation(equation);

    return (
        <main>
            <div>
                f(x)=
                <input
                    type="text"
                    value={candidateEq}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCandidateEq(e.target.value)} />
                <button onClick={(): void => setEquation(candidateEq)}>plot</button>
            </div>
            <Plot
                {...plotlyProps}
            />
        </main>
    );
};

function compileEquation (eq: string, range = [-10, 10, 0.5]): PlotParams {
    try {
        const expr = math.compile(eq);
        const [start, end, step] = range;
        const xValues = math.range(start, end, step).toArray() as number[];
        const yValues: number[] = xValues.map((x: number): number => expr.evaluate({x}));
        return {
            data: [{
                x: xValues,
                y: yValues,
                type: 'scatter',
                line: {
                    shape: 'spline'
                },
                mode: 'lines'
            }],
            layout: {}
        };
    } catch {
        return {
            data: [{
                x: [],
                y: [],
                type: 'scatter',
                line: {
                    shape: 'spline'
                },
                mode: 'lines'
            }],
            layout: {}
        };
    } finally {}
}

export default App;
