require 'rails_helper'

RSpec.describe CodeEvaluator, type: :service do
  describe "process" do
    context "with a valid program" do
      let(:program) {
        %{
          def say_hello 
            puts :hello_world
          end
          say_hello
        }
      }

      let(:ce) {
        CodeEvaluator.new(program).process
      }

      it "assigns the script's return value" do
        expect(ce.output.chomp).to eq("hello_world")
      end

      it "returns no errors" do
        expect(ce.error?).to be false
        expect(ce.error).to eq("")
      end

      it "assigns the script's process output" do
        expect(ce.status.pid).to be_truthy
        expect(ce.status.exitstatus).to eq(0)
      end
    end
    context "with an invalid program" do
      let(:program) do
        %{
          class Foo
            def bar
            end
          end

          puts Foo.bar
        }
      end

      let(:ce) do
        CodeEvaluator.new(program).process
      end

      it "assigns the script's return value" do
        expect(ce.output.chomp).to eq("")
      end

      it "returns errors" do
        expect(ce.error?).to be true
        expect(ce.error.chomp).to eq("-e:7:in `<main>': undefined method `bar' for Foo:Class (NoMethodError)")
      end

      it "assigns the script's process output" do
        expect(ce.status.pid).to be_truthy
        expect(ce.status.exitstatus).to eq(1)
      end
    end
    context "with a potentially dangerous program" do
      let(:program) do
        %{
          def safe
            eval("rm -rf ./tmp/")
            System.exec('ls')
            Open3.capture2('ls')
            `bash ruby`
          end
          puts safe
        }
      end

      let(:ce) do
        CodeEvaluator.new(program).process
      end

      it "sanitizes the script" do
        expect(ce.sanitized_code).to eq(%{
          def safe
            (" ./tmp/")
            .('ls')
            .capture2('ls')
             
          end
          puts safe
        })
      end

      it "assigns the script's return value" do
        expect(ce.output.chomp).to eq("")
      end

      it "returns errors" do
        expect(ce.error?).to be true
        expect(ce.error.chomp).to eq("-e:4:in `safe': undefined method `call' for \" ./tmp/\":String (NoMethodError)\n\tfrom -e:8:in `<main>'")
      end

      it "assigns the script's process output" do
        expect(ce.status.pid).to be_truthy
        expect(ce.status.exitstatus).to eq(1)
      end
    end
  end
end
