import React from 'react';
import './ColorPicker.css';
import classNames from 'classnames';
class ColorPicker extends React.Component {
    render() {
        const selectedVehicleData = this.props.vehicleData.filter(vehicle => vehicle.detailKey === this.props.selectedVehicle)[0];

        if (selectedVehicleData) {

            return (
                <div className="colorBox">
                    <table>
                        <tbody>
                            <tr>
                                {selectedVehicleData.colors.map((color, i) => {

                                    const btnClass = classNames({
                                        'colorBox': true,
                                        'selected': (this.props.selectedColor === i)
                                    });

                                    return <td key={"color-picker-" + color[1]}>
                                        <img
                                            className={btnClass}
                                            alt={color[0]}
                                            onClick={this.props.selectColor}
                                            data-color={i}
                                            data-colorname={color[0]}
                                            src={color[1]}
                                        /> <br />
                                        <span>{color[0]}</span>
                                    </td>
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ColorPicker;
