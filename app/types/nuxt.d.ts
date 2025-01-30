import type { AttributeRep } from "~/modules/attribute-groups/repositories/attribute";
import type { AttributeGroupRep } from "~/modules/attribute-groups/repositories/attrubuteGroup";
import type { AuthRep } from "~/modules/auth/repositories/auth";
import type { ProductsRep } from "~/modules/products/repositories/products";
import type { LangSettingsRep } from "~/repositories/langSettings";

declare module "#app" {
  interface NuxtApp {
    $authRep: AuthRep;
    $productsRep: ProductsRep;
    $attributeRep: AttributeRep;
    $attributeGroupRep: AttributeGroupRep;
    $langSettingsRep: LangSettingsRep;
  }
}
