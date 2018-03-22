import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Story } from './story';
import { Slice } from './Slice';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stories: Story[] = [
        { id: 1, title: 'Harry Potter' },
        { id: 2, title: 'Le seigneur des anneaux' },
        { id: 3, title: 'Las Vegas' },
        { id: 4, title: 'Issou' },
      ];
      const slices: Slice[] = [
        { level : 0, id : 10, title: 'Chapitre I', text: "[Aller dormir | dormir] ou [Explorer le chateau | exploration du chateau]", story: 1, choices : []},
        { level : 0, id : 2, title: 'terre', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 2, choices : [] },
        { level : 0, id: 3, title: 'lune', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 3, choices : [] },
        { level : 0, id : 4, title: 'soleil', text: 'qsdfsdfqsdfqsdfqdfqsdfqsdfqsdfqsdfqdfsdf', story: 4, choices : [] },
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

