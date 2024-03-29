// withMarkup.ts
import { MatcherFunction } from "@testing-library/react";

type Query = (f: MatcherFunction) => HTMLElement;

const withMarkup = (query: Query) => (text: string): HTMLElement =>
  query((content: string, node: any) => {
    const hasText = (node: HTMLElement) => node.textContent === text;
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child as HTMLElement)
    );
    return hasText(node) && childrenDontHaveText;
  });

export default withMarkup;
