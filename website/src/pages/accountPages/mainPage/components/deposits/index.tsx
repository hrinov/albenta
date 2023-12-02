import { FC } from "react";
import { RootStateInterface } from "../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InputNumber } from "antd";
import "./index.sass";

const Deposits: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  return (
    <section className="deposits">
      <div className="block">
        Calculate profit
        <div className="percent">5%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={0}
            max={100}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">10%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={0}
            max={100}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">15%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={0}
            max={100}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">20%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={0}
            max={100}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
      </div>
      <div className="block">
        Calculate profit
        <div className="percent">25%/hour</div>
        <div className="configurator">
          <div className="name">amount:</div>
          <InputNumber
            min={0}
            max={100000}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
        <div className="configurator">
          <div className="name">hours:</div>
          <InputNumber
            min={0}
            max={100}
            defaultValue={0}
            // onChange={onChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Deposits;
