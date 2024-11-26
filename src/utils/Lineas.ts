export const lineasPosibles: { [key: number]: number[][][] } = {
  1: [
    [ [1, 0], [1, 1], [1, 2]  ] //Horizontal central
  ],
  2: [
      [ [0, 0], [0, 1], [0, 2] ], //Horizontal superior
      [ [2, 0], [2, 1], [2, 2] ]  //Horizontal inferior
  ],
  3: [
      [ [0, 0], [0, 1], [0, 2] ], //Horizontal superior
      [ [1, 0], [1, 1], [1, 2] ], //Horizontal central
      [ [2, 0], [2, 1], [2, 2] ]  //Horizontal inferior
    ],
  5: [
      [ [0, 0], [0, 1], [0, 2] ], //Horizontal superior
      [ [1, 0], [1, 1], [1, 2] ], //Horizontal central
      [ [2, 0], [2, 1], [2, 2] ], //Horizontal inferior
      [ [0, 0], [1, 1], [2, 2] ], //Diagonal desde arriba
      [ [2, 0], [1, 1], [0, 2] ]  //Diagonal desde abajo
    ]
};