import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import axios from 'axios';
import { AxiosClient } from '../axios-client';

let client: AxiosClient = new AxiosClient({
  baseURL: 'http://localhost:3000',
  accessKey: '01977808-8260-70fa-ad85-9a32be7a2e2e',
  accessSecret: '4abaab01494d34660876099e4180e37c9e387f11c83e45ba',
  projectId: '019777cd-d45c-71a0-b12e-4838b22fc672',
});

describe('ApiClient integration (real HTTP)', () => {
  console.log(client);
  it('should return all dictionaries', async () => {
    const result = await client.dictionaryAll();
    console.log(result);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return correct label by value', async () => {
    const dictCode = 'sex';
    const itemValue = '1';

    const result = await client.queryByCodeAndValue(dictCode, itemValue);
    console.log(result);
    expect(result).toHaveProperty('name');
  });
});
