export const business = {
  name: "Dozoi",
  fullName: "Dozoi Hamburgueria, Pizzaria e Açaíteria",
  orderUrl: "https://wa.me/message/PX7LRSP23FBSJ1",
  instagramUrl: "https://www.instagram.com/dozoihamburgueriaepizzaria/",
  instagram: "@dozoihamburgueriaepizzaria",
  phone: "(31) 98846-5714",
  hours: "Todos os dias, a partir das 18h30",
  // Set only when the original Dozoi logo is supplied. Never recreate it.
  logoUrl: null as string | null,
};
export type MenuItem = { name: string; description: string; price: string };
// Publish only items transcribed from a legible, confirmed Dozoi menu.
export const confirmedBurgers: MenuItem[] = [];
