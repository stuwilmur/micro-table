export const fractionBuilderPrototype = {
  p: 1,
  q: 1,
  setp(p) {
    this.p = p;
    return this;
  },
  setq(q) {
    this.q = q;
    return this;
  },
  end() {
    return this.parent.withConstant(this.p / this.q);
  },
};
