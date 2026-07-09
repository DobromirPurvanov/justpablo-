// Обещание, което hero-то чака, за да не изиграе влизането си под интрото
let resolver: () => void = () => {}
export const introDone: Promise<void> = new Promise<void>(res => { resolver = res })
export const markIntroDone = () => resolver()
