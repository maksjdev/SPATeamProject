import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {MockDataService} from '@shared/mock-data.service';

@Injectable()
export class UserService {

  constructor(
    private mockDataService: MockDataService
  ) { }

  public getUserData(): User {
    return this.mockDataService.getMockActiveUser();
  }
}
