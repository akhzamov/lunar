import { defineNuxtPlugin } from "#app";
import { AttributeRep } from "~/modules/attribute-groups/repositories/attribute";
import { AttributeGroupRep } from "~/modules/attribute-groups/repositories/attrubuteGroup";
import { AuthRep } from "~/modules/auth/repositories/auth";
import { ProductsRep } from "~/modules/products/repositories/products";
import { LangSettingsRep } from "~/repositories/langSettings";
import { ProductTypesRep } from "~/modules/products/repositories/productTypes";

export default defineNuxtPlugin((nuxtApp) => {
  const authRep = new AuthRep();
  const productRep = new ProductsRep();
  const attributeRep = new AttributeRep();
  const attributeGroupRep = new AttributeGroupRep();
  const langSettingsRep = new LangSettingsRep();
  const productTypesRep = new ProductTypesRep();

  nuxtApp.provide("authRep", authRep);
  nuxtApp.provide("productRep", productRep);
  nuxtApp.provide("attributeRep", attributeRep);
  nuxtApp.provide("attributeGroupRep", attributeGroupRep);
  nuxtApp.provide("langSettingsRep", langSettingsRep);
  nuxtApp.provide("productTypesRep", productTypesRep);
});
