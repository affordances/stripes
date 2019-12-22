export const maxMagnitude = 16;

export const colors = [
  { label: "maroon", value: "#7c252a" },
  { label: "red", value: "#d73931" },
  { label: "orange", value: "#ea4d38" },
  { label: "yellow", value: "#f3ad45" },
  { label: "yellow gold", value: "#f1bf48" },
  { label: "muted gold", value: "#cc8b37" },
  { label: "green", value: "#335526" },
  { label: "teal", value: "#489da7" },
  { label: "powder blue", value: "#6cace4" },
  { label: "royal blue", value: "#144ea8" },
  { label: "navy blue", value: "#13294b" },
  { label: "purple", value: "#523178" },
  { label: "white", value: "#f6f7f4" },
  { label: "gray", value: "#999999" },
  { label: "black", value: "#212322" }
];

export const stripeOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" }
];

export const colorSequences = {
  1: { 1: [[1]] },
  2: {
    2: [
      [1, 2],
      [2, 1]
    ]
  },
  3: {
    1: [[1, 0, 1]],
    2: [
      [1, 2, 1],
      [2, 1, 2],
      [1, 0, 2],
      [2, 0, 1]
    ],
    3: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ]
  }
};

// FOUR STRIPES
// COLORS	2	ABAB
// 			BABA

// 		3	ABCA
// 			ACBA
// 			BACB
// 			BCAB
// 			CABC
// 			CBAC

// FIVE STRIPES
// COLORS	1	AXAXA

// 		2	AXBXA
// 			BXAXB

// 			ABXBA
// 			BAXAB

// 			ABABA
// 			BABAB

// 		3	ABCBA
// 			ACBCA
// 			BACAB
// 			BCACB
// 			CABAC
// 			CBABC

// 		3	AXBXC
// 			AXCXB
// 			BXAXC
// 			BXCXA
// 			CXAXB
// 			CXBXA

// SIX STRIPES
// COLORS	2	AXABXB
// 			AXBAXB
// 			BXABXA
// 			BXBAXA

// 			ABABAB
// 			BABABA

// 		3	AXBCXA
// 			AXCBXA
// 			BXACXB
// 			BXCAXB
// 			CXABXC
// 			CXBAXC

// 			ABCABC
// 			ACBACB
// 			BACBAC
// 			BCABCA
// 			CABCAB
// 			CBACBA

// SEVEN STRIPES
// COLORS	1	AXAXAXA

// 		2	AXBXBXA
// 			BXAXAXB

// 			AXABAXA
// 			AXBABXA
// 			BXABAXB
// 			BXBABXB

// 			ABXAXBA
// 			ABXBXBA
// 			BAXAXAB
// 			BAXBXAB

// 			ABAXABA
// 			BABXBAB

// 			ABABABA
// 			BABABAB

// 		2	AXBXAXB
// 			BXAXBXA

// 		3	AXBCBXA
// 			AXCBCXA
// 			BXACAXB
// 			BXCACXB
// 			CXABAXC
// 			CXBABXC

// 			ABXCXBA
// 			ACXBXCA
// 			BAXCXAB
// 			BCXAXCB
// 			CAXBXAC
// 			CBXAXBC

// 			ABCXCBA
// 			ACBXBCA
// 			BACXCAB
// 			BCAXACB
// 			CABXBAC
// 			CBAXABC

// 			ABACABA
// 			ACABACA
// 			BABCBAB
// 			BCBABCB
// 			CACBCAC
// 			CBCACBC

// 			ABCACBA
// 			ABCBCBA
// 			ACBABCA
// 			ACBCBCA
// 			BACACAB
// 			BACBCAB
// 			BCABACB
// 			BCACACB
// 			CABABAC
// 			CABCBAC
// 			CBABABC
// 			CBACABC

// EIGHT STRIPES
// COLORS	2	ABXABXAB
// 			BAXBAXBA

// 			ABABABAB
// 			BABABABA

// 		3	AXBCBCXA
// 			AXCBCBXA
// 			BXACACXB
// 			BXCACAXB
// 			CXABABXC
// 			CXBABAXC

// NINE STRIPES
// COLORS	1	AXAXAXAXA

// 		2	AXAXBXAXA
// 			AXBXAXBXA
// 			AXBXBXBXA
// 			BXAXAXAXB
// 			BXAXBXAXB
// 			BXBXAXBXB

// 			AXABXBAXA
// 			AXBAXABXA
// 			BXABXBAXB
// 			BXBAXABXB

// 			AXABABAXA
// 			AXBABABXA
// 			BXABABAXA
// 			BXBABABXA

// 			ABXAXAXBA
// 			ABXBXBXBA
// 			BAXAXAXAB
// 			BAXBXBXAB

// 			ABXABAXBA
// 			ABXBABXBA
// 			BAXABAXAB
// 			BAXBABXAB

// 			ABAXAXABA
// 			ABAXBXABA
// 			BABXAXBAB
// 			BABXBXBAB

// 			ABABXBABA
// 			BABAXABAB

// 			ABABABABA
// 			BABABABAB

// 		2	AXBAXBAXB
// 			BXABXABXA

// 			ABXAXBXAB
// 			BAXBXAXBA

// 		3	AXBXCXBXA
// 			AXCXBXCXA
// 			BXAXCXAXB
// 			BXCXAXCXB
// 			CXAXBXAXC
// 			CXBXAXBXC

// 			AXBCXCBXA
// 			AXCBXBCXA
// 			BXACXCAXB
// 			BXCAXACXB
// 			CXABXBAXC
// 			CXBAXABXC

// 			AXBCACBXA
// 			AXBCBCBXA
// 			AXCBABCXA
// 			AXCBCBCXA
// 			BXACACAXB
// 			BXACBCAXB
// 			BXCABACXB
// 			BXCACACXB
// 			CXABABAXC
// 			CXABCBAXC
// 			CXBABABXC
// 			CXBACABXC

// 			ABXACAXBA
// 			ABXBCBXBA
// 			ABXCACXBA
// 			ABXCBCXBA
// 			ACXABAXCA
// 			ACXBABXCA
// 			ACXBCBXCA
// 			ACXCBCXCA
// 			BAXACAXAB
// 			BAXBCBXAB
// 			BAXCACXAB
// 			BAXCBCXAB
// 			BCXABAXCB
// 			BCXACAXCB
// 			BCXBABXCB
// 			BCXCACXCB
// 			CAXABAXAC
// 			CAXBABXAC
// 			CAXBCBXAC
// 			CAXCBCXAC
// 			CBXABAXBC
// 			CBXACAXBC
// 			CBXBABXBC
// 			CBXCACXBC

// 			ABAXCXABA
// 			ACAXBXACA
// 			BABXCXBAB
// 			BCBXAXBCB
// 			CACXBXCAC
// 			CBCXAXCBC

// 			ABCABACBA
// 			ABCACACBA
// 			ABCBABCBA
// 			ABCBCBCBA
// 			ACBABABCA
// 			ACBACABCA
// 			ACBCACBCA
// 			ACBCBCBCA
// 			BACABACAB
// 			BACACACAB
// 			BACBABCAB
// 			BACBCBCAB
// 			BCABABACB
// 			BCABCBACB
// 			BCACACACB
// 			BCACBCACB
// 			CABABABAC
// 			CABACABAC
// 			CABCACBAC
// 			CABCBCBAC
// 			CBABABABC
// 			CBABCBABC
// 			CBACACABC
// 			CBACBCABC
