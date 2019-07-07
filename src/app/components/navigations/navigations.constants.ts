import { INavigationList } from '../../models/navigation.model';

export const navigationList: INavigationList[] = [
  { title: 'Početna', icon: 'home', link: '/' },
  { title: 'Upisi', icon: 'how_to_vote', link: '/applicants' },
  { title: 'Članovi', icon: 'people', link: '/members' },
  { title: 'Grupe', icon: 'group_work', link: '/groups' },
  { title: 'Aktivnosti', icon: 'assessment', link: '/activities' }
  // { title: 'Statistika', icon: 'trending_up', link: '/statistics' }
];
