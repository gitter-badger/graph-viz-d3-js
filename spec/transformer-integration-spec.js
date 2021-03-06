define(['transformer', 'spec/shapes/longer-labels',
    'text!spec/dots/directed/switch.gv', 'spec/shapes/directed/switch',
    'text!spec/dots/directed/table.gv', 'spec/shapes/directed/table'],
  function (transformer, longerLabels, switchSource, switchShape, tableSource, tableShape) {
  describe('Transformer', function() {
    xit('should extract viz.js error from console', function() {
      var stage = transformer.generate("digraph g {\n{a b} -> {c d}\n");
      expect(stage).toEqual({
        ok: false,
        error: "Error: syntax error in line 3 near ''" // FIXME why it returns line 3120
      });
    });

    it("should extract node shapes correctly when labels are longer than 4 chars", function() {
      var stage = transformer.generate("digraph { longer -> labels -> ok}");
      expect(stage).toEqual(longerLabels);
    });

    it("should handle struct with multiple edges", function() {
      var stage = transformer.generate(switchSource);
      expect(stage).toEqual(switchShape);
    });

    it("should handle diagrams with html tables", function() {
      var stage = transformer.generate(tableSource);
      expect(stage).toEqual(tableShape);
    });
  });
});