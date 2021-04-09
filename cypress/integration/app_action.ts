/// <reference types="Cypress" />
// @ts-check
import {
  addDefaultTodos,
  addTodos,
  allItems,
  TODO_ITEM_ONE,
  TODO_ITEM_THREE,
  TODO_ITEM_TWO,
  toggle,
} from './utils';


describe('TodoMVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    // In firefox, blur handlers will fire upon navigation if there is an activeElement.
    // Since todos are updated on blur after editing,
    // this is needed to blur activeElement after each test to prevent state leakage between tests.
    cy.window().then((win) => {
      // @ts-ignore
      win.document.activeElement.blur();
    });
  });

  context('When page is initially opened', () => {
    it('should focus on the todo input field', () => {
      // get the currently focused element and assert
      // that it has class='new-todo'
      //
      // http://on.cypress.io/focused
      cy.focused().should('have.class', 'new-todo');
    });
  });

  context('No Todos', () => {
    it('should hide #main and #footer', () => {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      allItems().should('not.exist');
      cy.get('.main').should('not.exist');
      cy.get('.footer').should('not.exist');
    });
  });

  context('New Todo', () => {
    // These tests confirm that add new Todo items works.
    // All tests go through the DOM and events just like a real user would.

    // Input element selector for typing new todo title
    const NEW_TODO = '.new-todo';

    it('should allow me to add todo items', () => {
      cy.get(NEW_TODO)
        .type(TODO_ITEM_ONE)
        .type('{enter}');

      allItems()
        .eq(0)
        .invoke('text')
        .should('contain', TODO_ITEM_ONE);

      cy.get(NEW_TODO)
        .type(TODO_ITEM_TWO)
        .type('{enter}');

      allItems()
        .eq(1)
        .invoke('text')
        .should('contain', TODO_ITEM_TWO);
    });

    it('adds items', () => {
      // create several todos then check the number of items in the list
      cy.get(NEW_TODO)
        .type('todo A{enter}')
        .type('todo B{enter}') // we can continue working with same element
        .type('todo C{enter}') // and keep adding new items
        .type('todo D{enter}');

      allItems().should('have.length', 4);
    });
  });
});
