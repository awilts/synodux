// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

//Temporary workaround until release of new CRA version, see here: https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0
// @ts-ignore
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
