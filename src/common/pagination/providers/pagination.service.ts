import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../../../common/pagination/dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationService {
  constructor(
    /**inject request */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    /** create the request URLs */
    const protocol = this.request.protocol;
    const host = this.request.headers.host;
    const baseURL = `${protocol}://${host}/`;
    const url = this.request.url;
    const newUrl = new URL(url, baseURL);
    console.log(newUrl);

    /** calculating page number */
    const totalItems = await repository.count({});
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}/${newUrl.pathname}?page=${1}&limit=${paginationQuery.limit}`,
        previous: `${newUrl.origin}/${newUrl.pathname}?page=${previousPage}&limit=${paginationQuery.limit}`,
        current: `${newUrl.origin}/${newUrl.pathname}?page=${paginationQuery.page}&limit=${paginationQuery.limit}`,
        next: `${newUrl.origin}/${newUrl.pathname}?page=${nextPage}&limit=${paginationQuery.limit}`,
        last: `${newUrl.origin}/${newUrl.pathname}?page=${totalPages}&limit=${paginationQuery.limit}`,
      },
    };

    return finalResponse;
  }
}
