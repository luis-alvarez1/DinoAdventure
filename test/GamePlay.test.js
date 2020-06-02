describe('', () => {
    test("Rectangle is overlapping", () => {
        var rect1 = { x: 100, y: 100, width: 100, height: 100 };
        var rect2 = { x: 150, y: 150, width: 100, height: 100 };

        expect(isRectangleOverlapping(rect1, rect2)).toBeTruthy();
    });
})