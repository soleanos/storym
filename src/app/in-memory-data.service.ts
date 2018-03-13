import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Story } from './story';
import { Slice } from './Slice';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stories: Story[] = [
        { id: 11, title: 'Mr. Nice' },
        { id: 12, title: 'Narcopppp' },
        { id: 13, title: 'Bombasto' },
        { id: 14, title: 'Celeritas' },
        // { id: 15, title: 'Magneta' },
        // { id: 16, title: 'RubberMan' },
        // { id: 17, title: 'Dynama' },
        // { id: 18, title: 'Dr IQ' },
        // { id: 19, title: 'Magma' },
        { id: 20, title: 'Tornado' }
      ];
      const slices: Slice[] = [
        { title: 'etoile', text: 'nous allons manger et puis [aller vagabonder ] test sqdqsdqs [mdr ] lol', story: 11 },
        { title: 'terre', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 11 },
        { title: 'lune', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 12 },
        { title: 'soleil', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 11 },
      ];
    return {stories, slices};
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    if (collectionName === 'nobodies') {
      console.log('genId override for \'nobodies\'');
      return this.guid();
    } else if (collection) {
      console.log(`genId override for '${collectionName}'`);
      return 1 + collection.reduce((prev, curr) => Math.max(prev, curr.id || 0), 1000);
    }

}
}

