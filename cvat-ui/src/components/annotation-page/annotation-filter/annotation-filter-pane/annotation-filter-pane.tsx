// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Icon, Popconfirm } from 'antd';
import React, { ReactElement, useRef, useState } from 'react';
import AnnotationFiltersItem from '../annotation-filter-item/annotation-filter-item';
import AnnotationFilterPanel from '../annotation-filter-panel/annotation-filter-panel';
import './annotation-filter-pane.scss';

const AnnotationFilterPane = (): ReactElement => {
    const [filters, setFilters] = useState([] as number[]);
    const [filterPanelVisible, setFilterPanelVisible] = useState(true);

    const filtersEndRef = useRef<null | HTMLDivElement>(null);
    const clearFiltersRef = useRef<null | HTMLAnchorElement>(null);

    // const scrollFiltersToBottom = (): void => {
    //     setTimeout(() => filtersEndRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 100);
    // };

    const resetFilters = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        setFilters([]);
    };

    const confirmClearFilters = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        clearFiltersRef?.current?.click();
    };

    return (
        <>
            <div
                className='annotation-filters-pane'
                onClick={() => setFilterPanelVisible(true)}
                onContextMenu={(e: React.MouseEvent<HTMLElement, MouseEvent>) => confirmClearFilters(e)}
            >
                {filters?.length ? (
                    <>
                        {filters.map((item: number) => (
                            <AnnotationFiltersItem key={item} item={item} />
                        ))}
                        <div className='pop-confirm-wrapper' onClick={(e) => e.stopPropagation()}>
                            <Popconfirm
                                placement='bottom'
                                title='Are you sure you want to clear all filters?'
                                icon={<Icon type='question-circle-o' style={{ color: 'red' }} />}
                                onConfirm={(e) => resetFilters(e)}
                                okText='Yes'
                                cancelText='No'
                            >
                                <span ref={clearFiltersRef} />
                            </Popconfirm>
                        </div>
                        <div ref={filtersEndRef} />
                    </>
                ) : (
                    <div className='no-filters'>
                        <Icon className='no-filters-icon' type='filter' />
                        <span>Annotations filters</span>
                    </div>
                )}
            </div>
            <AnnotationFilterPanel isVisible={filterPanelVisible} onClose={() => setFilterPanelVisible(false)} />
        </>
    );
};

export default AnnotationFilterPane;
