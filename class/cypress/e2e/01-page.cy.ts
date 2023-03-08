it("페이지 이동 시나리오", () => {
  cy.visit("http://localhost:3000/section33/33-06-cypress-e2e-test");
  cy.get("button").click();
  cy.get("div").contains("철수야 놀자");
});
