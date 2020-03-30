import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Owner } from './owner';
import { OwnerService } from './owner.service';

describe('Owner service: ', () => {
  // A small collection of test owners
  const testOwners: Owner[] = [
    {
      _id: 'rachel_id',
      name: 'Rachel Johnson',
      officeNumber: '1234',
      email: 'rmjohns@morris.umn.edu',
      building: 'Science',
      x500: 'rmjohns',
    },
    {
      _id: 'joe_id',
      name: 'Joe Beaver',
      officeNumber: '5678',
      email: 'jbeaver@morris.umn.edu',
      building: 'Imholte',
      x500: 'jbeaver'
    },
    {
      _id: 'james_id',
      name: 'James Flegel',
      officeNumber: '9012',
      email: 'fleg0003@morris.umn.edu',
      building: 'HFA',
      x500: 'fleg0003'
    }
  ];
  let ownerService: OwnerService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    ownerService = new OwnerService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getOwnerById() calls api/owners/id', () => {
    // grab an owner from our test array
    const targetOwner: Owner = testOwners[1];
    // pull the id from that owner
    const targetId: string = targetOwner._id;
    // get that owner from the server and check that you got the right one
    ownerService.getOwnerById(targetId).subscribe(
      owner => expect(owner).toBe(targetOwner)
    );

    const expectedUrl: string = ownerService.ownerUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    // should be a GET request
    expect(req.request.method).toEqual('GET');
    req.flush(targetOwner);
  });


  it('addOwner() calls api/owners/new', () => {

    ownerService.addOwner(testOwners[1]).subscribe(
      id => expect(id).toBe('testid')
    );

    const req = httpTestingController.expectOne(ownerService.ownerUrl + '/new');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testOwners[1]);

    req.flush({ id: 'testid' });
  });

});
