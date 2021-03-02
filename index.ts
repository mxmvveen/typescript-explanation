const names: Array<string | null> = ['John', null, 'Jane', 'Walter', null];

const nameList: string[] = names.filter((name: string | null) => name !== null) as string[];

