import React, { FC, Dispatch, SetStateAction } from 'react';

export interface DataSetProperty {
  name: string;
  label: string;
  min: Record<string, number>;
  max: Record<string, number>;
}

export interface DataSet {
  properties: DataSetProperty[];
}

interface Props {
  benefits: DataSet;
  setSelectedBenefitProperty: Dispatch<SetStateAction<DataSetProperty>>;
  selectedBenefitMinValue: number;
  setSelectedBenefitMinValue: (min: number) => void;
  selectedBenefitMaxValue: number;
  setSelectedBenefitMaxValue: (max: number) => void;
  childs: DataSet;
  setSelectedChildProperty: Dispatch<DataSetProperty>;
  selectedChildMinValue: number;
  setSelectedChildMinValue: (min: number) => void;
  selectedChildMaxValue: number;
  setSelectedChildMaxValue: (max: number) => void;
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
          onChange={event => {
            const benefit = benefits.properties.find(
              (benefit: DataSetProperty) => benefit.name === event.target.value,
            );

            if (benefit) {
              setSelectedBenefitProperty(benefit);
            }
          }}
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
          onChange={event =>
            setSelectedBenefitMinValue(Number(event.target.value))
          }
        />

        <label htmlFor="benefitMax">Benefit Max: </label>
        <input
          id="benefitMax"
          name="benefitMax"
          type="number"
          value={selectedBenefitMaxValue}
          onChange={event =>
            setSelectedBenefitMaxValue(Number(event.target.value))
          }
        />
      </div>

      <div>
        <label htmlFor="child">Child: </label>
        <select
          name="child"
          onChange={event => {
            const child = childs.properties.find(
              (child: DataSetProperty) => child.name === event.target.value,
            );

            if (child) {
              setSelectedChildProperty(child);
            }
          }}
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
          onChange={event =>
            setSelectedChildMinValue(Number(event.target.value))
          }
        />

        <label htmlFor="childMax">Child Max: </label>
        <input
          id="childMax"
          name="childMax"
          type="number"
          defaultValue={selectedChildMaxValue}
          onChange={event =>
            setSelectedChildMaxValue(Number(event.target.value))
          }
        />
      </div>
    </>
  );
};
