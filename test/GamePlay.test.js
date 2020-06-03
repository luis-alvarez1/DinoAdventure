describe("", () => {
  test("Rectangle is overlapping", () => {
    function isRectangleOverlapping(rect1, rect2) {
      //se valida si los recangulos se tocan o se sobreponen y devuelve false si no es así
      if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
        return false;
      }
      if (
        rect1.y > rect2.y + rect2.height ||
        rect2.y > rect1.y + rect1.height
      ) {
        return false;
      }
      return true; // devuelve true si se tocan
    }

    var rect1 = { x: 100, y: 100, width: 100, height: 100 };
    var rect2 = { x: 150, y: 150, width: 100, height: 100 };

    expect(isRectangleOverlapping(rect1, rect2)).toBeTruthy();
  });
});
