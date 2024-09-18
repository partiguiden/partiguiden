declare module "eslint-plugin-turbo" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-import" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react" {
  import type { ConfigWithExtends } from "typescript-eslint";

  export const configs: {
    flat: {
      all: ConfigWithExtends;
      recommended: ConfigWithExtends;
      "jsx-runtime": ConfigWithExtends;
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: {
      rules: {
        "rules-of-hooks": Linter.RuleEntry;
        "exhaustive-deps": Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "@next/eslint-plugin-next" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    "core-web-vitals": { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}
