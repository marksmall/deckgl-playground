import React, { useEffect, useState, FC } from 'react';

interface Props {

}

export const MapControls: FC<Props> = ({
  benefits,
  setSelectedBenefitProperty,
  selectedBenefitMinValue,
  setSelectedBenefitMinValue,
  selectedBenefitMaxValue,
  setSelectedBenefitMaxValue,
  childs,
  setSelectedChildProperty,
  selectedChildMinValue,
  setSelectedChildMinValue,
  selectedChildMaxValue,
  setSelectedChildMaxValue,
}) => {
  return (
    <>
      <div>
        <label htmlFor="benefit">Benefits: </label>
        <select
          name="benefit"
          onChange={event =>
            setSelectedBenefitProperty(
              benefits.properties.find(
                benefit => benefit.name === event.target.value,
              ),
            )
          }
        >
          {benefits?.properties.map(benefit => (
            <option key={benefit.name} value={benefit.name}>
              {benefit.label}
            </option>
          ))}
        </select>

        <label htmlFor="benefitMin">Benefit Min: </label>
        <input
          id="benefitMin"
          name="benefitMin"
          type="number"
          value={selectedBenefitMinValue}
          onChange={event => setSelectedBenefitMinValue(event.target.value)}
        />

        <label htmlFor="benefitMax">Benefit Max: </label>
        <input
          id="benefitMax"
          name="benefitMax"
          type="number"
          value={selectedBenefitMaxValue}
          onChange={event => setSelectedBenefitMaxValue(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="child">Child: </label>
        <select
          name="child"
          onChange={event =>
            setSelectedChildProperty(
              childs.properties.find(
                child => child.name === event.target.value,
              ),
            )
          }
        >
          {childs?.properties.map(child => (
            <option key={child.name} value={child.name}>
              {child.label}
            </option>
          ))}
        </select>

        <label htmlFor="childMin">Child Min: </label>
        <input
          id="childMin"
          name="childMin"
          type="number"
          defaultValue={selectedChildMinValue}
          onChange={event => setSelectedChildMinValue(event.target.value)}
        />

        <label htmlFor="childMax">Child Max: </label>
        <input
          id="childMax"
          name="childMax"
          type="number"
          defaultValue={selectedChildMaxValue}
          onChange={event => setSelectedChildMaxValue(event.target.value)}
        />
      </div>
    </>
  );
};