describe("Assessment", () => {
  it("assessment", () => {
    cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
    cy.xpath('//*[text()="Table Data"]').click();
    cy.get("#jsondata").should("be.visible");
    let data = [
      { name: "Bob", age: 20, gender: "male" },
      { name: "George", age: 42, gender: "male" },
      { name: "Sara", age: 42, gender: "female" },
      { name: "Conor", age: 40, gender: "male" },
      { name: "Jennifer", age: 42, gender: "female" },
    ];
    cy.get("#jsondata")
      .clear()
      .type(JSON.stringify(data), { parseSpecialCharSequences: false });
    cy.get("#refreshtable").should("be.visible").click();
    cy.get("#dynamictable tr td:nth-child(1)").each(($el, index) => {
      let text = $el.text();
      expect(text).to.eq(data[index].name);
    });
    cy.get("#dynamictable tr td:nth-child(2)").each(($el, index) => {
      let text = $el.text();
      expect(text).to.eq(JSON.stringify(data[index].age));
    });
    cy.get("#dynamictable tr td:nth-child(3)").each(($el, index) => {
      let text = $el.text();
      expect(text).to.eq(data[index].gender);
    });
  });
});
