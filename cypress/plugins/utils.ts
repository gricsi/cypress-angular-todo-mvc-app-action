/// <reference types="cypress" />

export const TODO_ITEM_ONE = 'buy some cheese';

export const TODO_ITEM_TWO = 'feed the cat';

export const TODO_ITEM_THREE = 'book a doctors appointment';

/**
 * App action to creates default todo items.
 *
 * @example
 *  import { addDefaultTodos } from './utils'
 *  beforeEach(addDefaultTodos)
 */
export const addDefaultTodos = () => {
  cy.window()
    .its('model')
    .should('be.an', 'object')
    .invoke('addTodo', TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE);

  cy.get('[data-cy=list-item]').as('todos');
};

/**
 * App action to create one or more todos.
 */
export const addTodos = (...todos) => {
  cy.window()
    .its('model')
    .should('be.an', 'object')
    .invoke('addTodo', ...todos);
};

/**
 * App action to toggle the given todo item.
 * Returns chain so you can attach more Cypress commands.
 * @param k index of the todo item to toggle, 0 - first item
 */
export const toggle = (k = 0) => {
  return cy
    .window()
    .its('model')
    .should('be.an', 'object')
    .then((model) => {
      expect(k, 'check item index').to.be.lessThan(model.todos.length);
      model.toggle(model.todos[k]);
    });
};

const ALL_ITEMS = '[data-cy=list-item]';

/**
 * Returns all todo items on the page.
 */
export const allItems = () => cy.get(ALL_ITEMS);
