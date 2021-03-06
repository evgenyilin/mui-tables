import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import sinon from 'sinon';
import MUITableBodyCell from '../../../src/components/Body/MUITableBodyCell';
import { DEFAULT_COL, DEFAULT_CONTEXT } from '../../../src/constants';
import { MUITableTestContext } from '../../utils';

const sandbox = sinon.createSandbox();
afterEach(cleanup);
afterAll(sandbox.restore);

describe("MUITableBodyCell", () => {
    test("renders children when no cell is passed", () => {
        const { getByText } = render(
            <MUITableTestContext override={{ displayRows: [] }}>
                <MUITableBodyCell key={"1"} colSpan={1} rowIndex={0}>
                    Test
                </MUITableBodyCell>
            </MUITableTestContext>
        );
        expect(() => getByText("Test")).not.toThrow();
    });

    test("renders cell.display when cell is passed", () => {
        const { getByText } = render(
            <MUITableTestContext override={{ displayRows: [] }}>
                <MUITableBodyCell
                    key={"1"}
                    colSpan={1}
                    rowIndex={0}
                    cell={{ display: "CELL DISPLAY", value: 1, column: DEFAULT_COL }}
                />
            </MUITableTestContext>
        );
        expect(() => getByText("Test")).toThrow();
        expect(() => getByText("CELL DISPLAY")).not.toThrow();
    });

    test("calls onCellClick hook when its clicked", () => {
        const spy = sandbox.spy((e: any) => {});
        const row = [{ display: "CELL DISPLAY", value: 1, column: DEFAULT_COL }];
        const { getByText } = render(
            <MUITableTestContext
                override={{
                    options: {
                        ...DEFAULT_CONTEXT.options,
                        hooks: { onCellClick: spy }
                    }
                }}
            >
                <MUITableBodyCell
                    key={"1"}
                    colSpan={1}
                    rowIndex={0}
                    row={row}
                    cell={row[0]}
                />
            </MUITableTestContext>
        );
        const cell = getByText("CELL DISPLAY");
        fireEvent.click(cell);
        expect(spy.called).toBe(true);
    });
    test("calls onRowClick hook when its clicked", () => {
        const spy = sandbox.spy((e: any) => {});
        const row = [{ display: "CELL DISPLAY", value: 1, column: DEFAULT_COL }];
        const { getByText } = render(
            <MUITableTestContext
                override={{
                    options: {
                        ...DEFAULT_CONTEXT.options,
                        hooks: { onRowClick: spy }
                    }
                }}
            >
                <MUITableBodyCell
                    key={"1"}
                    colSpan={1}
                    rowIndex={0}
                    row={row}
                    cell={row[0]}
                />
            </MUITableTestContext>
        );
        const cell = getByText("CELL DISPLAY");
        fireEvent.click(cell);
        expect(spy.called).toBe(true);
    });
});
