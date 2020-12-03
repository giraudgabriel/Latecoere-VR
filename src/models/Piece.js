class Piece {
  constructor(
    id,
    src,
    src_img,
    name,
    positionX = "10.1",
    positionY = "0",
    positionZ = "0"
  ) {
    this._id = id;
    this.src = src;
    this.src_img = src_img;
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
  }
}

export default Piece;
