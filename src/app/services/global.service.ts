import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
  public user = new BehaviorSubject(null);
  public admin = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
  public order = new BehaviorSubject({});
  public searchTerm = new BehaviorSubject('');

  public slugify(text: string) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  public hashCode(input: string) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  public states = [
    { name: 'Alabama', abbreviation: 'AL'},
    { name: 'Alaska', abbreviation: 'AK'},
    { name: 'American Samoa', abbreviation: 'AS'},
    { name: 'Arizona', abbreviation: 'AZ'},
    { name: 'Arkansas', abbreviation: 'AR'},
    { name: 'California', abbreviation: 'CA'},
    { name: 'Colorado', abbreviation: 'CO'},
    { name: 'Connecticut', abbreviation: 'CT'},
    { name: 'Delaware', abbreviation: 'DE'},
    { name: 'District of Columbia', abbreviation: 'DC'},
    { name: 'Federated States of Micronesia', abbreviation: 'FM'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'Georgia', abbreviation: 'GA'},
    { name: 'Guam', abbreviation: 'GU'},
    { name: 'Hawaii', abbreviation: 'HI'},
    { name: 'Idaho', abbreviation: 'ID'},
    { name: 'Illinois', abbreviation: 'IL'},
    { name: 'Indiana', abbreviation: 'IN'},
    { name: 'Iowa', abbreviation: 'IA'},
    { name: 'Kansas', abbreviation: 'KS'},
    { name: 'Kentucky', abbreviation: 'KY'},
    { name: 'Louisiana', abbreviation: 'LA'},
    { name: 'Maine', abbreviation: 'ME'},
    { name: 'Marshall Islands', abbreviation: 'MH'},
    { name: 'Maryland', abbreviation: 'MD'},
    { name: 'Massachusetts', abbreviation: 'MA'},
    { name: 'Michigan', abbreviation: 'MI'},
    { name: 'Minnesota', abbreviation: 'MN'},
    { name: 'Mississippi', abbreviation: 'MS'},
    { name: 'Missouri', abbreviation: 'MO'},
    { name: 'Montana', abbreviation: 'MT'},
    { name: 'Nebraska', abbreviation: 'NE'},
    { name: 'Nevada', abbreviation: 'NV'},
    { name: 'New Hampshire', abbreviation: 'NH'},
    { name: 'New Jersey', abbreviation: 'NJ'},
    { name: 'New Mexico', abbreviation: 'NM'},
    { name: 'New York', abbreviation: 'NY'},
    { name: 'North Carolina', abbreviation: 'NC'},
    { name: 'North Dakota', abbreviation: 'ND'},
    { name: 'Northern Mariana Islands', abbreviation: 'MP'},
    { name: 'Ohio', abbreviation: 'OH'},
    { name: 'Oklahoma', abbreviation: 'OK'},
    { name: 'Oregon', abbreviation: 'OR'},
    { name: 'Palau', abbreviation: 'PW'},
    { name: 'Pennsylvania', abbreviation: 'PA'},
    { name: 'Puerto Rico', abbreviation: 'PR'},
    { name: 'Rhode Island', abbreviation: 'RI'},
    { name: 'South Carolina', abbreviation: 'SC'},
    { name: 'South Dakota', abbreviation: 'SD'},
    { name: 'Tennessee', abbreviation: 'TN'},
    { name: 'Texas', abbreviation: 'TX'},
    { name: 'Utah', abbreviation: 'UT'},
    { name: 'Vermont', abbreviation: 'VT'},
    { name: 'Virgin Islands', abbreviation: 'VI'},
    { name: 'Virginia', abbreviation: 'VA'},
    { name: 'Washington', abbreviation: 'WA'},
    { name: 'West Virginia', abbreviation: 'WV'},
    { name: 'Wisconsin', abbreviation: 'WI'},
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  public orderStatuses = [
    { id: 'SUBMITTED'},
    { id: 'PAID'},
    { id: 'SHIPPED'},
    { id: 'DELIVERED'},
    { id: 'EXCEPTION'},
  ];
}
