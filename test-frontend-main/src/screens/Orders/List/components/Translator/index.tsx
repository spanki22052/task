interface KeyValueSet {
  [key: string]: string;
}

export const statusTranslator: KeyValueSet = {
  complete: "завершено",
  "no-call": "нет вызова",
  "cancel-other": "отменили",
  "already-buyed": "уже куплено",
  prepayed: "предоплачен",
  delivering: "идет доставка",
  redirect: "перенаправили",
  "send-to-delivery": "отправили на доставку",
  assembling: "сборка",
  "no-product": "нет продукта",
  "delyvery-did-not-suit": "доставка не подошла",
  "prices-did-not-suit": "не устроила цена",
  new: "новое",
};

export const deliveryTranslator: KeyValueSet = {
  "self-delivery": "самовывоз",
  courier: "курьер",
  "russian-post": "российский пост",
  delivered: "доставлен",
  "": "доставлен",
  ems: "ems",
};
