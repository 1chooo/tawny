/** Light bento cell — inverts to dark ink on hover */
export const bentoCellHover =
  "transition-colors hover:bg-art-bento-ink hover:text-art-bento-bg";

/** For cells whose children should inherit the hover text color */
export const bentoCellGroup = `group bg-art-bento-bg ${bentoCellHover}`;

/** Dark bento cell — inverts to light on hover */
export const bentoCellInvertedHover =
  "transition-colors hover:bg-art-bento-bg hover:text-art-bento-ink";
