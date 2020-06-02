function isRectangleOverlappingOverlapping(rect1, rect2) {
    //se valida si los recangulos se tocan o se sobreponen y devuelve false si no es así
    if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
        return false;
    }
    if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
        return false;
    }
    return true; // devuelve true si se tocan
}
module.exports = isRectangleOverlappingOverlapping;