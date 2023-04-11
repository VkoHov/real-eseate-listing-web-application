import React, { useState } from 'react';
import { Form, Input, Select, Button, Slider } from 'antd';
import { capitalize } from 'lodash-es';

import { PropertyType } from 'constants/post';
import { ISearchPostsProps, SearchParams } from '.';

import './SearchPosts.scss';

const { Option } = Select;

const SearchPosts = ({ onSearch }: ISearchPostsProps) => {
  const [form] = Form.useForm();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const onFinish = (values: SearchParams) => {
    onSearch({ ...values, priceRange });
  };

  const onSliderChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  return (
    <div className='SearchPosts'>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        className='SearchPosts__form'
      >
        <div className='SearchPosts__form__section'>
          <Form.Item label='Title' name='title'>
            <Input placeholder='Title' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input placeholder='Description' />
          </Form.Item>
        </div>
        <div className='SearchPosts__form__section'>
          <Form.Item label='Location' name='location'>
            <Input placeholder='Location' />
          </Form.Item>
          <Form.Item label='Property Type' name='propertyType'>
            <Select placeholder='Property Type'>
              {Object.values(PropertyType).map((value) => (
                <Option value={value} key={value}>
                  {capitalize(value)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='SearchPosts__form__section'>
          <Form.Item label='Price Range' className=''>
            <Slider
              range
              min={0}
              max={1000000}
              value={priceRange}
              onChange={onSliderChange}
              step={10000}
              tooltip={{
                open: true,
                formatter: (value: number | undefined) => `$${value}`,
                placement: 'bottom',
              }}
            />
          </Form.Item>

          <Form.Item className='SearchPosts__form__searchButton'>
            <Button type='primary' htmlType='submit' size='large'>
              Search
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SearchPosts;
