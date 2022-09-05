import React, { useEffect, useState } from 'react';

import Map from '~/map/map.component';
import { MapControls } from '~/map/map-controls.component';

import * as benefits from '../map/oa_gb_benefits_breakdown_raw_allgeo.json';
import * as childs from '../map/oa_gb_childpov2019_breakdown_raw_allgeo.json';

const App = () => {
  const [selectedBenefitProperty, setSelectedBenefitProperty] =
    useState<object>(benefits?.properties[0]);
  const [selectedChildProperty, setSelectedChildProperty] = useState<object>(
    childs?.properties[0],
  );

  const [selectedBenefitMinValue, setSelectedBenefitMinValue] =
    useState<number>(selectedBenefitProperty?.min.LAD19);
  const [selectedBenefitMaxValue, setSelectedBenefitMaxValue] =
    useState<number>(selectedBenefitProperty?.max.LAD19);
  const [selectedChildMinValue, setSelectedChildMinValue] = useState<number>(
    selectedChildProperty?.min.LAD19,
  );
  const [selectedChildMaxValue, setSelectedChildMaxValue] = useState<number>(
    selectedChildProperty?.max.LAD19,
  );

  useEffect(() => {
    setSelectedBenefitMinValue(selectedBenefitProperty?.min.LAD19);
    setSelectedBenefitMaxValue(selectedBenefitProperty?.max.LAD19);
  }, [selectedBenefitProperty]);

  useEffect(() => {
    setSelectedChildMinValue(selectedChildProperty?.min.LAD19);
    setSelectedChildMaxValue(selectedChildProperty?.max.LAD19);
  }, [selectedChildProperty]);

  return (
    <div className="">
      <main className="">
        <Map
          selectedProperties={[selectedBenefitProperty, selectedChildProperty]}
          selectedFilterRanges={[
            [selectedBenefitMinValue, selectedBenefitMaxValue],
            [selectedChildMinValue, selectedChildMaxValue],
          ]}
        />
      </main>

      <footer className="absolute bottom-10">
        <MapControls
          benefits={benefits}
          setSelectedBenefitProperty={setSelectedBenefitProperty}
          selectedBenefitMinValue={selectedBenefitMinValue}
          setSelectedBenefitMinValue={setSelectedBenefitMinValue}
          selectedBenefitMaxValue={selectedBenefitMaxValue}
          setSelectedBenefitMaxValue={setSelectedBenefitMaxValue}
          childs={childs}
          setSelectedChildProperty={setSelectedChildProperty}
          selectedChildMinValue={selectedChildMinValue}
          setSelectedChildMinValue={setSelectedChildMinValue}
          selectedChildMaxValue={selectedChildMaxValue}
          setSelectedChildMaxValue={setSelectedChildMaxValue}
        />
      </footer>
    </div>
  );
};

export default App;
