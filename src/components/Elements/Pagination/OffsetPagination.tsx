import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Button } from '..';

type Props = WrappedComponentProps & {
  total: number;
  limit: number;
  offset: number;
  onChange(offset: number): void;
};

export const OffsetPagination = injectIntl(({ intl, total, offset, limit, onChange }: Props) => {
  if (total < 1 || !limit) return null;
  const totalPages = total / limit
  const pages = [1, totalPages];
  // Array(Math.ceil(total / limit)).fill(null)
  // if (pages.length > 5) pages.length = 5;
  const nextOffset = total < (offset + limit) ? total : offset + limit;

  return (
    <nav aria-label="Page navigation" className="flex align-middle  justify-between mt-5">
      <span className="text-sm self-center text-gray-700 dark:text-gray-400">
        {intl.formatMessage({ id: 'ui.pagination' }, { offset, nextOffset, total })}
      </span>
      {/* <SelectField
      label='Show'
              error={formState.errors['limit']}
              registration={register('limit', {
                onChange() {
                  setParams(params => {
                    params.set('limit', getValues('limit'));
                    return params;
                  })
                }
              })}
              options={[10, 20, 30].map((count) => ({
                label: `Show ${count} items`,
                value: count,
              }))}∏
            /> */}


      <ul className="inline-flex -space-x-px text-base h-10 ml-5">
        <li>
          <Button size='xs' variant='inverse' disabled={offset < 1} onClick={() => onChange(offset - limit)}>
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
        </li>
        {pages.map((_, idx) => (
          <li key={idx}>
            <Button size='xs' variant='inverse' onClick={() => onChange((_ - 1) * limit)} className={clsx(idx * limit === offset ? 'text-blue-600 border-blue-300 bg-blue-100 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-700 dark:text-white' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700')}>
              {_}
            </Button>
          </li>
        ))}
        <li>
          <Button size='xs' variant='inverse' disabled={nextOffset >= total} onClick={() => onChange(offset + limit)}>
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </li>
      </ul>
    </nav >
  )
})




